// The paper background from the design: six dots pressed gently into the page, in
// turn. One small canvas behind everything; nothing runs for reduced motion or Save-Data.
const PV = "attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}";
const PF = "precision highp float;\nuniform vec2 uRes;uniform float uDpr;uniform float uScroll;uniform vec2 uL;uniform vec4 uP[3];uniform float uH[18];\nfloat hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\nvec3 noised(vec2 x){vec2 i=floor(x),f=fract(x);vec2 u=f*f*(3.0-2.0*f),du=6.0*f*(1.0-f);\nfloat a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));\nreturn vec3(a+(b-a)*u.x+(c-a)*u.y+(a-b-c+d)*u.x*u.y,du*(vec2(b-a,c-a)+(a-b-c+d)*u.yx));}\nfloat sst(float a,float b,float x){float t=clamp((x-a)/(b-a),0.0,1.0);return t*t*(3.0-2.0*t);}\nfloat dst(float a,float b,float x){float t=clamp((x-a)/(b-a),0.0,1.0);return 6.0*t*(1.0-t)/(b-a);}\nvec4 field(vec2 P,vec2 Ld){vec4 r=vec4(0.0);\nfor(int j=0;j<3;j++){vec4 p=uP[j];if(p.z<1.0)continue;\nfloat D=p.z,R=0.3*D,R0=0.6*R,w=R-R0;vec2 q0=P-p.xy;float Hs=0.0;\nfor(int i=0;i<6;i++){float f=float(i);float H=uH[j*6+i];Hs+=H;if(H<0.01)continue;\nvec2 q=q0-vec2(f<2.5?-0.5:0.5,mod(f,3.0)-1.0)*D;float d=length(q);float hn=min(1.3,H/(0.06*D));\nfloat e=(d-R*1.02)/(0.2*R);float ao=exp(-e*e)*hn;\nfloat dsh=length(q+Ld*0.22*R);float sh=(1.0-smoothstep(0.5*R,1.15*R,dsh))*smoothstep(R0,R,d)*hn;\nr.w+=ao*0.06+sh*0.05;\nif(d>=R)continue;\nfloat u=clamp((d-R0)/w,0.0,1.0);float A=1.0-u*u*(3.0-2.0*u);float dA=-6.0*u*(1.0-u)/w;\nfloat B=1.0-0.12*d*d/(R*R);float dB=-0.24*d/(R*R);\nfloat dh=H*(dA*B+A*dB);vec2 g=d>0.0001?dh*q/d:vec2(0.0);\nr.x+=H*A*B;r.y+=g.x;r.z+=g.y;}\n}\nreturn r;}\nvoid main(){vec2 p=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)/uDpr;vec2 P=p+vec2(0.0,uScroll);\nvec2 Ld=normalize(uL);vec4 d=field(P,Ld);vec2 g=d.yz;\nvec3 n1=noised(P*0.45),n2=noised(P*0.12);g+=n1.yz*0.04+n2.yz*0.03;\nvec3 n=normalize(vec3(-g,1.0));vec3 L=normalize(vec3(uL,0.7));\nfloat s=dot(n,L)-L.z;float dark=clamp(-s*0.75,0.0,0.5)+d.w;\ngl_FragColor=vec4(mix(vec3(1.0),vec3(0.80,0.795,0.82),clamp(dark,0.0,0.6)),1.0);}";

type Dot = { del: number; m: number; rise: number; hold: number; fall: number; pa: number; pf: number; pp: number };
type Press = { cx: number; cy: number; D: number; t0?: number; dots?: Dot[]; H: number; end?: number; done?: boolean; still?: boolean };

export function startPaper(cv: HTMLCanvasElement, reduced: boolean) {
  const gl = cv.getContext("webgl", { antialias: false, alpha: true, depth: false, stencil: false, preserveDrawingBuffer: true, powerPreference: "low-power" });
  if (!gl) return () => {};
  const shader = (type: number, source: string) => {
    const o = gl.createShader(type) as WebGLShader;
    gl.shaderSource(o, source);
    gl.compileShader(o);
    if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o) ?? "shader");
    return o;
  };
  const program = gl.createProgram() as WebGLProgram;
  gl.attachShader(program, shader(gl.VERTEX_SHADER, PV));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, PF));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link");
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const U = Object.fromEntries(["uRes", "uDpr", "uScroll", "uL", "uP", "uH"].map((n) => [n, gl.getUniformLocation(program, n)]));

  let presses: Press[] = [];
  let dpr = 1;
  let raf = 0;
  let last = 0;
  let spawnTimer: ReturnType<typeof setTimeout> | undefined;
  let second = true;
  let stopped = false;

  const size = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    cv.width = Math.round(window.innerWidth * dpr);
    cv.height = Math.round(window.innerHeight * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    request();
  };
  const request = () => {
    if (!raf && !stopped) raf = requestAnimationFrame(frame);
  };
  const smooth = (x: number) => {
    const v = Math.max(0, Math.min(1, x));
    return v * v * (3 - 2 * v);
  };
  const frame = (now: number) => {
    raf = 0;
    const active = presses.some((p) => !p.done && !p.still);
    if (active && last && now - last < 30) {
      raf = requestAnimationFrame(frame);
      return;
    }
    last = now;
    const P = new Float32Array(12);
    const H = new Float32Array(18);
    let slot = 0;
    let moving = false;
    presses.forEach((p) => {
      if (p.done || slot > 2) return;
      if (p.still) {
        for (let i = 0; i < 6; i += 1) H[slot * 6 + i] = p.H;
      } else {
        const t = now - (p.t0 ?? now);
        if (t > (p.end ?? 0)) {
          p.done = true;
          return;
        }
        moving = true;
        (p.dots ?? []).forEach((o, i) => {
          const l = t - o.del;
          const up = smooth(l / o.rise);
          const a = p.H * o.m * up * (1 - smooth((l - o.rise - o.hold) / o.fall)) * (1 + o.pa * up * Math.sin(t * 0.00628 * o.pf + o.pp));
          H[slot * 6 + i] = Math.max(0, a);
        });
      }
      P[slot * 4] = p.cx;
      P[slot * 4 + 1] = p.cy;
      P[slot * 4 + 2] = p.D;
      slot += 1;
    });
    presses = presses.filter((p) => !p.done);
    gl.uniform2f(U.uRes, cv.width, cv.height);
    gl.uniform1f(U.uDpr, dpr);
    gl.uniform1f(U.uScroll, window.scrollY || 0);
    gl.uniform2f(U.uL, -0.62, -0.78);
    gl.uniform4fv(U.uP, P);
    gl.uniform1fv(U.uH, H);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (moving) raf = requestAnimationFrame(frame);
  };
  const spawn = () => {
    if (document.hidden) return;
    const live = presses.filter((p) => !p.done);
    if (live.length >= 2) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const r = (a: number, b: number) => a + Math.random() * (b - a);
    const D = r(520, 760) * (w < 700 ? 0.75 : 1);
    let cx = 0;
    let cy = 0;
    let ok = false;
    for (let k = 0; k < 10 && !ok; k += 1) {
      cx = r(-D * 0.3, w + D * 0.3);
      cy = (window.scrollY || 0) + r(-D * 0.2, h + D * 0.2);
      ok = live.every((p) => Math.hypot(p.cx - cx, p.cy - cy) > (p.D + D) * 1.5);
    }
    if (!ok) return;
    const dots = [0, 1, 2, 3, 4, 5].map(() => ({ del: r(0, 4200), m: r(0.4, 1.15), rise: r(5000, 9000), hold: r(1200, 4200), fall: r(6500, 10500), pa: Math.random() < 0.55 ? r(0.08, 0.22) : 0, pf: r(0.1, 0.26), pp: r(0, 6.283) }));
    presses.push({ cx, cy, D, t0: performance.now(), dots, H: D * r(0.05, 0.065), end: Math.max(...dots.map((o) => o.del + o.rise + o.hold + o.fall)) });
    request();
  };
  const schedule = (ms: number) => {
    spawnTimer = setTimeout(() => {
      spawn();
      const first = second;
      second = false;
      schedule(first ? 2600 : 6000 + Math.random() * 5000);
    }, ms);
  };

  window.addEventListener("resize", size);
  window.addEventListener("scroll", request, { passive: true });
  size();
  if (reduced) {
    const w = window.innerWidth;
    const D = Math.min(700, w * 0.55);
    presses.push({ cx: w * 0.78, cy: window.innerHeight * 0.55, D, still: true, H: D * 0.055 });
    request();
  } else {
    // The first press waits for the opening animation to finish, as in the design.
    schedule((window as Window & { __nvCovered?: boolean }).__nvCovered ? 3600 : 400);
  }
  return () => {
    stopped = true;
    clearTimeout(spawnTimer);
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", size);
    window.removeEventListener("scroll", request);
  };
}

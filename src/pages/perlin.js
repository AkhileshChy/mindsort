// Perlin noise implementation
const noise = {
    grad3: [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
    ],
    p: [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],
    perm: new Array(512),
    gradP: new Array(512),
    
    seed: function(seed) {
      if(seed > 0 && seed < 1) {
        seed *= 65536;
      }
  
      seed = Math.floor(seed);
      if(seed < 256) {
        seed |= seed << 8;
      }
  
      for(let i = 0; i < 256; i++) {
        let v;
        if (i & 1) {
          v = this.p[i] ^ (seed & 255);
        } else {
          v = this.p[i] ^ ((seed>>8) & 255);
        }
  
        this.perm[i] = this.perm[i + 256] = v;
        this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
      }
    },
  
    simplex3: function(xin, yin, zin) {
      let n0, n1, n2, n3;
  
      const F3 = 1.0 / 3.0;
      const G3 = 1.0 / 6.0;
  
      let s = (xin + yin + zin) * F3;
      let i = Math.floor(xin + s);
      let j = Math.floor(yin + s);
      let k = Math.floor(zin + s);
  
      let t = (i + j + k) * G3;
      let x0 = xin - i + t;
      let y0 = yin - j + t;
      let z0 = zin - k + t;
  
      let i1, j1, k1;
      let i2, j2, k2;
  
      if(x0 >= y0) {
        if(y0 >= z0) {
          i1=1; j1=0; k1=0; i2=1; j2=1; k2=0;
        } else if(x0 >= z0) {
          i1=1; j1=0; k1=0; i2=1; j2=0; k2=1;
        } else {
          i1=0; j1=0; k1=1; i2=1; j2=0; k2=1;
        }
      } else {
        if(y0 < z0) {
          i1=0; j1=0; k1=1; i2=0; j2=1; k2=1;
        } else if(x0 < z0) {
          i1=0; j1=1; k1=0; i2=0; j2=1; k2=1;
        } else {
          i1=0; j1=1; k1=0; i2=1; j2=1; k2=0;
        }
      }
  
      let x1 = x0 - i1 + G3;
      let y1 = y0 - j1 + G3;
      let z1 = z0 - k1 + G3;
  
      let x2 = x0 - i2 + 2 * G3;
      let y2 = y0 - j2 + 2 * G3;
      let z2 = z0 - k2 + 2 * G3;
  
      let x3 = x0 - 1 + 3 * G3;
      let y3 = y0 - 1 + 3 * G3;
      let z3 = z0 - 1 + 3 * G3;
  
      i &= 255;
      j &= 255;
      k &= 255;
  
      let gi0 = this.gradP[i+this.perm[j+this.perm[k]]];
      let gi1 = this.gradP[i+i1+this.perm[j+j1+this.perm[k+k1]]];
      let gi2 = this.gradP[i+i2+this.perm[j+j2+this.perm[k+k2]]];
      let gi3 = this.gradP[i+1+this.perm[j+1+this.perm[k+1]]];
  
      let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
      if(t0<0) {
        n0 = 0;
      } else {
        t0 *= t0;
        n0 = t0 * t0 * this.dot3(gi0, x0, y0, z0);
      }
  
      let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
      if(t1<0) {
        n1 = 0;
      } else {
        t1 *= t1;
        n1 = t1 * t1 * this.dot3(gi1, x1, y1, z1);
      }
  
      let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
      if(t2<0) {
        n2 = 0;
      } else {
        t2 *= t2;
        n2 = t2 * t2 * this.dot3(gi2, x2, y2, z2);
      }
  
      let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
      if(t3<0) {
        n3 = 0;
      } else {
        t3 *= t3;
        n3 = t3 * t3 * this.dot3(gi3, x3, y3, z3);
      }
  
      return 32 * (n0 + n1 + n2 + n3);
    },
  
    dot3: function(g, x, y, z) {
      return g[0]*x + g[1]*y + g[2]*z;
    }
  };
  
  noise.seed(Math.random());
  
  export { noise };

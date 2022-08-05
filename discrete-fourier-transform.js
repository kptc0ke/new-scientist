// A student's guide to waves: page 99, 107

// dft: Discrete Fourier Transform
// data: an array of amplitude 
function dft(data) {
  let L = data.length

  let A_0 = data.reduce((a, b) => a + b, 0) / L // sum and average 
  let A_n = []
  let B_n = []
  
  // n: how many times of input signal frequency
  // first component wave is called the fundamental, it has the same frequency as input signal
  // data is over one cycle, n could be seen as frequency 
  for (let n = 0; n < 5; n += 1) { // here we choose 5 component waves
    A_n[n] = 0
    B_n[n] = 0
    // x: spacial frequency
    // choose variable t as temperal frequency 
    // devided by L could be confusing
    // because here L is data.length not wave period
    // L can be treated as length/period of one complete cycle
    // x=vt
    // x or t, doesn't affect calculation, just make more sense 
    for (let x = 0; x < L; x += 1) {
      // because n is also index of array
      // don't confuse n and n+1, frequency start from 1 time
      // 2π/L*x: see the unit rad/m*m, result is phase angle
      A_n[n] += data[x] * Math.cos((n+1) * 2*Math.PI/L*x)
      B_n[n] += data[x] * Math.sin((n+1) * 2*Math.PI/L*x)
    }
    // zero threshold size unclear
    if (Math.abs(A_n[n]) < 1e-10) A_n[n] = 0
    if (Math.abs(B_n[n]) < 1e-10) B_n[n] = 0
  }
  
  // L/2 vs L
  // https://www.thefouriertransform.com/series/coefficients.php
  A_n = A_n.map(el => el / (L/2))
  B_n = B_n.map(el => el / (L/2))
  
  console.log(A_0)
  console.log(A_n)
  console.log(B_n)
}

// square wave test appears to be right
data = [2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0]
dft(data)

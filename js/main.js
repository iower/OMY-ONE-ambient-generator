const audioCtx = new (window.AudioContext || window.webkitAudioContext)();


const busNode = audioCtx.createGain();
busNode.gain.value = 0.4;
busNode.connect(audioCtx.destination);

const faders = document.getElementById('faders');

const createGroup = (startFreq) => {
	const group = document.createElement('div');
	group.classList.add('group');
	
	for (let i = 1; i <= 6; i++) {
		const oscillator = audioCtx.createOscillator();
		
		oscillator.type = 'sine';
		oscillator.frequency.value = startFreq * 2 ** i;
		
		const gainNode = audioCtx.createGain();
		oscillator.connect(gainNode);
		
		const startGain = 1 / 2.4 ** i;
		
		gainNode.faderGain = startGain;
		gainNode.gain.value = startGain;
		gainNode.connect(busNode);
		
		
		modulateGain(gainNode, {
			freq: i,
			depth: 0.2 + i / 10,
		});
		
		
		const fader = document.createElement('input');
		fader.type = 'range';
		fader.min = 0;
		fader.max = 1;
		fader.step = 0.01;
		fader.value = startGain;
		
		fader.oninput = (event) => {
			const value = event.target.value;
			gainNode.faderGain = value;
			gainNode.gain.value = value;
		}
		
		group.appendChild(fader);
		oscillator.start();
	}
	
	faders.appendChild(group);
	
}


const modulateGain = (node, options) => {
	setInterval(() => {
		const period = 1 / options.freq;
		const depth = options.depth;
		const modulation = (Math.cos(2*Math.PI * (audioCtx.currentTime % period / period)) + 1) / 2 * depth + 1 - depth;
		node.gain.value = node.faderGain * modulation;
	}, 10);
}

createGroup(32,7032);
createGroup(36,7081);
createGroup(41,2035);
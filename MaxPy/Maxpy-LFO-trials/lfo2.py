import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place a cycle~ object for our main sine wave oscillator at frequency 440Hz
main_osc = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Place a cycle~ object for our LFO at frequency 5Hz (This will act as the vibrato rate)
lfo_osc = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object to multiply the LFO signal (modulating the amplitude of the vibrato)
lfo_amp = patch.place("*~ 10", num_objs=1, starting_pos=[100, 300])[0]

# Place a +~ object to sum the original frequency with the LFO signal (creating the vibrato effect)
sum_freq = patch.place("+~ 440", num_objs=1, starting_pos=[100, 400])[0]

# Place a dac~ object to output the audio signal
audio_out = patch.place("dac~", num_objs=1, starting_pos=[100, 500])[0]

# Connection - Connect the LFO oscillator output to the multiplier (*~) input
patch.connect([lfo_osc.outs[0], lfo_amp.ins[0]])

# Connection - Connect the main oscillator to the audio out
patch.connect([main_osc.outs[0], audio_out.ins[0]])

# Connection - Connect the output of the LFO amp multiplier to the summing object
patch.connect([lfo_amp.outs[0], sum_freq.ins[0]])

# Connection - Connect the summing object to control the frequency of the main oscillator
patch.connect([sum_freq.outs[0], main_osc.ins[0]])

# Save the patch with the name "vibrato_effect.maxpat"
patch.save("lfo2.maxpat")
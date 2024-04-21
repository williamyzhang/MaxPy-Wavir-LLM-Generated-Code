import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Creating the primary sine wave oscillator
sine_wave = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]   # Base frequency set to 440Hz

# Creating the LFO
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]   # LFO with frequency 5Hz, for vibrato effect

# Creating a multiplier to control the depth of the vibrato effect
mult = patch.place("*~ 10", num_objs=1, starting_pos=[100, 300])[0]  # Depth of vibrato effect

# Adding an object to sum the base frequency with the vibrato effect
add = patch.place("+~ 440", num_objs=1, starting_pos=[100, 400])[0]  # Adding vibrato effect back to the base frequency

# Creating a gain control object
gain = patch.place("gain~", num_objs=1, starting_pos=[100, 500])[0]

# Creating an ezdac~ object for audio output
audio_out = patch.place("ezdac~", num_objs=1, starting_pos=[100, 600])[0]

# Connecting objects
patch.connect([lfo.outs[0], mult.ins[0]])  # LFO output controlling multiplier
patch.connect([mult.outs[0], add.ins[0]])  # Output of multiplier connected to addition object
patch.connect([add.outs[0], sine_wave.ins[0]])  # Resulting frequency connected back to the sine wave oscillator
patch.connect([sine_wave.outs[0], gain.ins[0]])  # Connect sine wave to gain
patch.connect([gain.outs[0], audio_out.ins[0]])  # Gain to audio output left channel
patch.connect([gain.outs[0], audio_out.ins[1]])  # Gain to audio output right channel

# Save the patch
patch.save("lfo4.maxpat")
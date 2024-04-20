import maxpy as mp
from random import randint

# Create a new patch
patch = mp.MaxPatch()

# Number of oscillators and LFOs
num_osc = 1  # Using only one oscillator for simplicity
num_lfo = 1  # Using a single LFO to modulate our oscillator's frequency

# Create sine wave oscillators
osc_freq = 440  # Base frequency for our sine wave oscillator in Hz
osc = patch.place(f"cycle~ {osc_freq}", num_objs=num_osc, starting_pos=[0, 100])[0]

# Create LFOs for modulating the frequency of the oscillators (vibrato effect)
lfo_rate = 5  # The rate of the LFO in Hz
lfo_depth = 50  # Depth of the LFO in Hz, determining the vibrato's intensity

# Dynamically setting the LFO rate and depth using for loop and/or random
for i in range(num_lfo):
    # Random rate between 1 Hz and 10 Hz
    random_rate = randint(1, 10)
    # Random depth between 10 Hz and 100 Hz
    random_depth = randint(10, 100)
    lfo = patch.place(f"cycle~ {random_rate}", num_objs=1, starting_pos=[100, (i+1)*150])[0]
    # Scaling the amplitude of the LFO to match the depth
    lfo_depth_amp = patch.place(f"*~ {random_depth}", num_objs=1, starting_pos=[200, (i+1)*150])[0]
    patch.connect([lfo.outs[0], lfo_depth_amp.ins[0]])

    # Modulating the frequency of the oscillator
    # Using +~ object to add base frequency and LFO modulation together
    freq_modulation = patch.place("+~", num_objs=1, starting_pos=[300, 100])[0]
    patch.connect([osc.outs[0], freq_modulation.ins[0]])
    patch.connect([lfo_depth_amp.outs[0], freq_modulation.ins[1]])

# Create an audio output (DAC)
dac = patch.place("ezdac~", num_objs=1, starting_pos=[400, 100])[0]
patch.connect([freq_modulation.outs[0], dac.ins[0]])

# Save the patch
patch.save("lfo9.maxpat")

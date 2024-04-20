import maxpy as mp

patch = mp.MaxPatch()

# Define the number of church bell strikes
num_strikes = 4

# Create a metro object to trigger the bell strikes at regular intervals (every 2 seconds = 2000 ms)
metro = patch.place("metro 2000", num_objs=1, starting_pos=[100, 100])[0]

# Create a toggle to start/stop the metro (bell striking mechanism)
toggle = patch.place("toggle", num_objs=1, starting_pos=[100, 50])[0]

# Connect the toggle to the metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Create a cycle~ object to simulate the bell's tone, with a low frequency for a deep bell sound
bell_tone_freq = 120  # Frequency in Hz, typical for a large church bell
bell_tone = patch.place(f"cycle~ {bell_tone_freq}", num_objs=1, starting_pos=[300, 300])[0]

# Create an envelope for shaping the bell sound, simulating the striking effect
# ADSR: Attack, Decay, Sustain, Release - Modify values to mimic the bell's sound dynamics
envelope = patch.place("adsr 50 200 0.2 500", num_objs=1, starting_pos=[300, 200])[0]

# Create a *~ object to apply the envelope to the bell tone
env_mult = patch.place("*~", num_objs=1, starting_pos=[500, 300])[0]

# Connect the metro to the envelope (to trigger it) and then the envelope to the *~ object
patch.connect([metro.outs[0], envelope.ins[0]])
patch.connect([envelope.outs[0], env_mult.ins[0]])
patch.connect([bell_tone.outs[0], env_mult.ins[1]])

# Add a reverb effect to simulate the church acoustics
reverb = patch.place("reverb~", num_objs=1, starting_pos=[700, 300])[0]

# Connect the bell sound (after envelope application) to the reverb
patch.connect([env_mult.outs[0], reverb.ins[0]])

# Output to dac~
dac = patch.place("dac~", num_objs=1, starting_pos=[900, 300])[0]

# Connect the reverb to the dac
patch.connect([reverb.outs[0], dac.ins[0]])
patch.connect([reverb.outs[0], dac.ins[1]])

# Finally, save the patch
patch.save("CB9.maxpat")
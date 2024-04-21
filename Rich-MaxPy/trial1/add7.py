
import maxpy as mp
import random

# Create a new Max patch
patch = mp.MaxPatch()

# Base frequency for our sine wave (fundamental frequency)
base_freq = 220  # in Hz

# Objects
# Create a cycle~ object for our fundamental frequency
main_osc = patch.place(f"cycle~ {base_freq}", starting_pos=[100, 100])[0]

# Create an accumulative sum for the final synthesis
accum = patch.place("accum~", starting_pos=[100, 300])[0]
patch.connect(main_osc.outs[0], accum.ins[0])

# Create partials above the fundamental frequency
num_partials = 4
partials_start_pos = [200, 100]
partials_spacing = [100, 0]  # Spacing between partial objects

for i in range(1, num_partials + 1):
    # Frequency for the partial. Multiplied by 'i' to get integer multiples of the fundamental frequency
    partial_freq = base_freq * (i + 1)  # i+1 to ensure it's above the fundamental frequency
    
    # Generate a random amplitude for variance
    amp = round(random.uniform(0.2, 0.8), 2)  # Random amplitude between 0.2 and 0.8

    # Create the cycle~ object for the partial
    partial_osc = patch.place(f"cycle~ {partial_freq} *~ {amp}", starting_pos=[partials_start_pos[0] + partials_spacing[0] * i, partials_start_pos[1]])

    # Connect the partial oscillator to the accumulative sum
    patch.connect(partial_osc.outs[0], accum.ins[0])

# Finally, output the sum to a dac~ object to hear the synthesized sound
dac = patch.place("dac~", starting_pos=[100, 500])
patch.connect(accum.outs[0], dac.ins[0])

patch.save("add7.maxpat")

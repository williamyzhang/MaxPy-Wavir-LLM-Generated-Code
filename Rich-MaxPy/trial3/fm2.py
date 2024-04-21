import maxpy as mp
import random

patch = mp.MaxPatch()

# Carrier sine wave
car_freq = 440  # Base frequency for the carrier
car = patch.place(f"cycle~ {car_freq}", num_objs=1, starting_pos=[100, 50])[0]

# Modulator sine wave
mod_base_freq = 220  # Base frequency for the modulator
mod_index = 100  # Modulation index
mod = patch.place(f"cycle~ {mod_base_freq}", num_objs=1, starting_pos=[100, 150])[0]

# Multiplying mod_index with modulator's output
mod_index_mult = patch.place(f"*~ {mod_index}", num_objs=1, starting_pos=[100, 250])[0]

# Adding carrier frequency to the modulation
freq_sum = patch.place("+~", num_objs=1, starting_pos=[300, 150])[0]

# The final carrier signal whose frequency is modulated
final_car = patch.place("cycle~", num_objs=1, starting_pos=[500, 150])[0]

# DAC to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[700, 150])[0]

# Connecting the modulator to the modulation index multiplier
patch.connect([mod.outs[0], mod_index_mult.ins[0]])

# Connecting the mod_index_mult to one of the inputs of the freq_sum
patch.connect([mod_index_mult.outs[0], freq_sum.ins[0]])

# Direct connection from carrier to another input of freq_sum
patch.connect([freq_sum.ins[1], car.outs[0]])

# Frequency of the final carrier is the result of modulation
patch.connect([freq_sum.outs[0], final_car.ins[0]])

# Connecting the final carrier to the DAC
patch.connect([final_car.outs[0], dac.ins[0]])
patch.connect([final_car.outs[0], dac.ins[1]])

# Save the patch
patch.save("fm2.maxpat")

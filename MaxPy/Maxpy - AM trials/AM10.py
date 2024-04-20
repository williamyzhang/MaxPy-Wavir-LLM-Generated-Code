import maxpy

# Initialize a new MaxMSP patch
patch = maxpy.MaxPatch("AM_Synthesis_Patch")

# Add a dac~ object to output sound
dac = patch.add_object("dac~")

# Add a cycle~ object for the carrier signal
carrier_freq = 440  # Frequency in Hz
carrier = patch.add_object("cycle~", [carrier_freq])

# Add a cycle~ object for the modulation signal
modulator_freq = 10  # Frequency in Hz, making it a low frequency for modulation purposes
modulator = patch.add_object("cycle~", [modulator_freq])
modulation_depth = 100  # Modulation depth as a percentage

# Add a *~ object to modulate the amplitude of the carrier signal
amplitude_modulation = patch.add_object("*~", [modulation_depth])

# Add objects to control the modulation depth dynamically (optional)
modulation_depth_ctl = patch.add_object("flonum", [modulation_depth])
patch.add_connection(modulation_depth_ctl, 0, amplitude_modulation, 1)

# Connect the modulator to the amplitude modulation object's right inlet
patch.add_connection(modulator, 0, amplitude_modulation, 1)

# Connect the carrier signal to the amplitude modulation object's left inlet
patch.add_connection(carrier, 0, amplitude_modulation, 0)

# Connect the amplitude modulation object to the dac~ for output
patch.add_connection(amplitude_modulation, 0, dac, 0)
patch.add_connection(amplitude_modulation, 0, dac, 1)

# save the patch
patch.save("AM10.maxpat")

print("AM Synthesis Patch is successfully created.")
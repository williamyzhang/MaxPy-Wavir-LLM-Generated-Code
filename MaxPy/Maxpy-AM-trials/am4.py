from maxpy import MaxObject, MaxPatch

# Initial setup
patch = MaxPatch("AM Sine Wave Synthesis")

# Carrier oscillator - Sine wave at a certain frequency
carrier_freq = 440  # Carrier frequency in Hz (A4 note)
carrier = MaxObject("cycle~", args=[carrier_freq], x=100, y=100)
patch.add_object(carrier)

# Modulator oscillator - Sine wave that will modulate the amplitude of the carrier
modulator_freq = 50  # Modulator frequency in Hz
modulation_depth = 100  # This will control the depth of the modulation
modulator = MaxObject("cycle~", args=[modulator_freq], x=100, y=200)
scale = MaxObject("*~", args=[modulation_depth], x=100, y=300)  # A scaling factor for the modulator
patch.add_object(modulator)
patch.add_object(scale)

# Connect the modulator to the scaling factor.
patch.add_connection(modulator, 0, scale, 0)

# Amplitude modulation operation
# We need to scale the modulator signal such that it goes from 0 to 1 (assuming unit amplitude for the carrier)
scaled_modulator = MaxObject("+~", args=[1], x=100, y=400)  # Shifts the modulator signal's amplitude
patch.add_object(scaled_modulator)
patch.add_connection(scale, 0, scaled_modulator, 0)

modulated_signal = MaxObject("*~", x=100, y=500)  # Final AM signal
patch.add_object(modulated_signal)

# Connect Carrier and Modulated Modulator
patch.add_connection(carrier, 0, modulated_signal, 0)
patch.add_connection(scaled_modulator, 0, modulated_signal, 1)

# Output the modulated signal
dac = MaxObject("dac~", x=100, y=600)
patch.add_object(dac)
patch.add_connection(modulated_signal, 0, dac, 0)
patch.add_connection(modulated_signal, 0, dac, 1)

# Save the patch
patch.save("am4.maxpat")
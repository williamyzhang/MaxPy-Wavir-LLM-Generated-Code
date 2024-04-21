import maxpy

# Create a new patch
patch = maxpy.MaxPatch('VibratoEffect.maxpat')

# Main oscillator for the sine wave
main_osc = patch.add_object('cycle~', 440, x=100, y=100)
# LFO oscillator
lfo_osc = patch.add_object('cycle~', 5, x=100, y=200)  # A low frequency of 5 Hz for vibrato
# Scaling amplitude of LFO signal
scale_lfo = patch.add_object('*~', 10, x=100, y=300)  # Modulation depth of 10 Hz
# Add scaled LFO signal to the main oscillator's frequency
modulate_freq = patch.add_object('+~', 440, x=100, y=400)
# Audio output
dac = patch.add_object('dac~', x=100, y=500)

# Connect objects
patch.add_connection(lfo_osc, 0, scale_lfo, 0)
patch.add_connection(scale_lfo, 0, modulate_freq, 0)
patch.add_connection(main_osc, 0, dac, 0)
patch.add_connection(modulate_freq, 0, main_osc, 0)

# Export the patch
patch.export()
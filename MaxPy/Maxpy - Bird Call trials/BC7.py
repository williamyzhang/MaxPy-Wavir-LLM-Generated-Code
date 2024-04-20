import maxpy as mp

patch = mp.MaxPatch()

# Create metronome to control the timing of bird calls
interval = patch.place("metro 500", num_objs=1, starting_pos=[50, 50])[0]  # Interval in ms
toggle = patch.place("toggle", num_objs=1, starting_pos=[50, 100])[0]
patch.connect([toggle.outs[0], interval.ins[0]])

# Random object for pitch variation within a range
pitch_range = patch.place("random 24", num_objs=1, starting_pos=[50, 150])[0]  # 2 Octaves range
plus = patch.place("+ 60", num_objs=1, starting_pos=[50, 200])[0]  # Base MIDI note at 60 (Middle C)
patch.connect([interval.outs[0], pitch_range.ins[0]])
patch.connect([pitch_range.outs[0], plus.ins[0]])

# Random object for varying note durations to mimic the natural variation in bird calls
duration = patch.place("random 400", num_objs=1, starting_pos=[50, 250])[0]  # Duration in ms
plus_dur = patch.place("+ 100", num_objs=1, starting_pos=[50, 300])[0]  # Minimum duration
patch.connect([interval.outs[0], duration.ins[0]])
patch.connect([duration.outs[0], plus_dur.ins[0]])

# 'makenote' to generate MIDI note messages
makenote = patch.place("makenote", num_objs=1, starting_pos=[150, 250])[0]
patch.connect([plus.outs[0], makenote.ins[0]])  # MIDI note number
patch.connect([plus_dur.outs[0], makenote.ins[1]])  # Duration

# MIDI output
noteout = patch.place("noteout", num_objs=1, starting_pos=[150, 350])[0]
patch.connect([makenote.outs[0], noteout.ins[0]])  # Note on
patch.connect([makenote.outs[1], noteout.ins[1]])  # Note off

# Save the patch
patch.save("BC7.maxpat")
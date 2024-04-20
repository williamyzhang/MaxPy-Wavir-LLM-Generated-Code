import maxpy as mp

# Initialize the MaxPatch object
patch = mp.MaxPatch()

# Set the tempo for the bird call rhythm
metro = patch.place("metro 200", num_objs=1, starting_pos=[0, 0])[0]

# Create a toggle to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[-100, 0])[0]

# Connect toggle to metro to control it
patch.connect([toggle.outs[0], metro.ins[0]])

# Create a random object to generate pitch variations
random_pitch = patch.place("random 7", num_objs=1, starting_pos=[0, 100])[0]
# Setting up a message to set range in random object
set_range = patch.place("message 7", num_objs=1, starting_pos=[-100, 100])[0]

# Connect metro output to trigger random pitch variations
patch.connect([metro.outs[0], random_pitch.ins[0]])

# Connect set_range message to random object to define its range
patch.connect([set_range.outs[0], random_pitch.ins[1]])

# Create objects for selecting specific pitches based on random output
sel = patch.place("select 0 1 2 3 4 5 6", num_objs=1, starting_pos=[0, 200])[0]

# Connect random_pitch output to select input
patch.connect([random_pitch.outs[0], sel.ins[0]])

# Create osc~ objects to generate tones for each selected pitch
tones = patch.place("cycle~", num_objs=7, starting_pos=[0, 300])

# Define base frequency for the bird call
base_freq = 440

# Connect select outputs to cycle~ frequency inputs with pitch variations
for i, tone in enumerate(tones):
    # Calculate pitch variation
    freq_var = base_freq + (i * 50)  # Increase frequency for each selected output
    # Create message to update cycle~ frequency
    freq_msg = patch.place(f"message {freq_var}", num_objs=1, starting_pos=[tone.pos[0], tone.pos[1]-50])[0]
    # Connect message to cycle~ frequency input
    patch.connect([freq_msg.outs[0], tone.ins[0]])
    # Connect select output to frequency message trigger
    patch.connect([sel.outs[i], freq_msg.ins[0]])

# Create a gain object to control the volume of the output
gain = patch.place("*~ 0.1", num_objs=1, starting_pos=[200, 400])[0]

# Connect all tones to the gain input
for tone in tones:
    patch.connect([tone.outs[0], gain.ins[0]])

# Create a dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[200, 500])[0]

# Connect the gain output to the dac~ inputs (left and right channels)
patch.connect([gain.outs[0], dac.ins[0]])
patch.connect([gain.outs[0], dac.ins[1]])

# Save the patch
patch.save("bird5.maxpat")
import maxpy as mp
import random

patch = mp.MaxPatch()

# Setting the parameters for the patch
num_streams = 5  # Number of individual 'streams' or noise sources to simulate the brook
initial_position = [100, 100]  # Starting position for placing objects
vertical_spacing = 60  # Vertical spacing between placed objects

# Creating the sources of the brook sound, using noise~ objects
streams = patch.place("noise~", num_objs=num_streams, starting_pos=initial_position)

# Filtering each stream to soften the sound, simulating water
filtered_streams = []
for i, stream in enumerate(streams):
    # Generating random values for the center-frequency and resonance of the low-pass filter to vary the sound
    center_frequency = random.uniform(300, 1200)
    resonance = random.uniform(0.1, 0.5)
    filter_str = f"svf~ {center_frequency} {resonance}"
    filter_position = [initial_position[0], initial_position[1] + (i + 1) * vertical_spacing]
    filtered_stream = patch.place(filter_str, num_objs=1, starting_pos=filter_position)[0]
    filtered_streams.append(filtered_stream)

    # Connecting each noise stream to its corresponding filter
    patch.connect([stream.outs[0], filtered_stream.ins[0]])

# Modulating the volume of each filtered stream to simulate varying water flow
for i, filtered_stream in enumerate(filtered_streams):
    # Using line~ objects to smoothly change the amplitude
    line_str = "line~"
    line_position = [initial_position[0] + 100, initial_position[1] + (i * vertical_spacing)]
    volume_control = patch.place(line_str, num_objs=1, starting_pos=line_position)[0]
    
    # Connecting the volume control to the right inlet of *~ objects for amplitude control
    multiply_str = "*~"
    multiply_position = [initial_position[0] + 200, initial_position[1] + (i * vertical_spacing)]
    volume_multiplier = patch.place(multiply_str, num_objs=1, starting_pos=multiply_position)[0]
    
    patch.connect([filtered_stream.outs[0], volume_multiplier.ins[0]])
    patch.connect([volume_control.outs[0], volume_multiplier.ins[1]])
    
    # Randomly changing the volume over time using the makenoise object to trigger volume changes
    volume_trigger_position = [initial_position[0] - 100, initial_position[1] + (i * vertical_spacing)]
    trigger_str = f"metro {random.randint(200, 2000)}"
    volume_trigger = patch.place(trigger_str, num_objs=1, starting_pos=volume_trigger_position)[0]
    
    # Connecting the trigger to the line~ object to change volume
    patch.connect([volume_trigger.outs[0], volume_control.ins[0]])

# Outputting the composite stream to the dac~
composite_output_position = [initial_position[0] + 300, initial_position[1] + (num_streams) * vertical_spacing]
dac = patch.place("dac~", num_objs=1, starting_pos=composite_output_position)[0]

# Connecting all streams to the output
for volume_multiplier in filtered_streams:
    patch.connect([volume_multiplier.outs[0], dac.ins[0]])
    patch.connect([volume_multiplier.outs[0], dac.ins[1]])

# Saving the patch
patch.save("brook3.maxpat")

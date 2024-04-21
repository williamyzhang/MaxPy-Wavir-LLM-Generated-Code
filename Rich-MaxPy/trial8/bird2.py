import maxpy as mp
import random

patch = mp.MaxPatch()

# Set number of tones to simulate the complexity of bird calls
numTones = 5

# Create a master toggle to control the bird call
master_toggle = patch.place("toggle", num_objs=1, starting_pos=[20, 20])[0]

# Generate rhythmic intervals and pitches with randomness
for i in range(numTones):
    # Starting positions for objects
    x_pos = 100 + (i * 120)
    y_pos = 100

    # Random intervals for metro objects to simulate variance in call timing
    interval = random.randint(200, 1000)  # Interval between 200ms and 1000ms
    metro = patch.place("metro " + str(interval), num_objs=1, starting_pos=[x_pos, y_pos])[0]
    patch.connect([master_toggle.outs[0], metro.ins[0]])

    # Toggling mechanism for each bird call component
    toggle = patch.place("toggle", num_objs=1, starting_pos=[x_pos, y_pos + 50])[0]
    patch.connect([metro.outs[0], toggle.ins[0]])

    # Random frequencies to more accurately represent the pitch variance
    frequency = random.randint(300, 3000)  # Frequency between 300Hz and 3000Hz
    # Using cycle~ object for continuous tones
    cycle = patch.place("cycle~ " + str(frequency), num_objs=1, starting_pos=[x_pos, y_pos + 100])[0]
    patch.connect([toggle.outs[0], cycle.ins[0]])

    # Output gain control and connection to DAC
    gain = patch.place("gain~ ", num_objs=1, starting_pos=[x_pos, y_pos + 150])[0]
    patch.connect([cycle.outs[0], gain.ins[0]])
    
# Connect the last gain to the ezdac~ object for audio output
ezdac = patch.place("ezdac~ ", num_objs=1, starting_pos=[20, y_pos + 200])[0]
patch.connect([gain.outs[0], ezdac.ins[0]])

# Save the patch
patch_name = "bird2.maxpat"
patch.save(patch_name)

print(f"Patch '{patch_name}' has been generated successfully.")

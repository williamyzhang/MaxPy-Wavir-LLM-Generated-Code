import random
from maxpy import *

# Initialize the MaxPy patch
patch = MaxPatch()

# Define parameters for the church bell sound
num_bells = 5  # Number of bells/sounds to generate
pitch_range = (40, 70)  # MIDI pitch range for the bells
velocity_range = (60, 100)  # MIDI velocity range (volume)
interval_range = (1000, 2000)  # Range for intervals between bell sounds in milliseconds

# Create metro object to trigger the bells at random intervals
metro = patch.newdefault(0, 0, 'metro', random.randint(*interval_range))
metro.varname = 'metro_bell'

# Create random object to generate random pitches within the range
random_pitch = patch.newdefault(100, 0, 'random', pitch_range[1] - pitch_range[0] + 1)
random_pitch.varname = 'random_pitch'

# Create + object to adjust the minimum pitch
pitch_offset = patch.newdefault(150, 0, '+', pitch_range[0])
pitch_offset.varname = 'pitch_offset'

# Connect objects
patch.connect(metro, 0, random_pitch, 0)
patch.connect(random_pitch, 0, pitch_offset, 0)

# Create a noteout object to send MIDI
noteout = patch.newdefault(200, 0, 'noteout')

# Loop to create a sequence of bell sounds with varying parameters
for i in range(num_bells):
    delay = patch.newdefault(250 + i*100, 0, 'delay', random.randint(*interval_range))
    delay.varname = f'delay_{i}'
    makenote = patch.newdefault(300 + i*100, 0, 'makenote', random.randint(*velocity_range), 1000)
    makenote.varname = f'makenote_{i}'

    # Connect everything
    patch.connect(pitch_offset, 0, makenote, 0)
    patch.connect(makenote, 0, noteout, 0)
    patch.connect(delay, 0, makenote, 0)
    patch.connect(metro, 0, delay, 0)

# Save the patch
patch.saveas('ChurchBell.maxpat')

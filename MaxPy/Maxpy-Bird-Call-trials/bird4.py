import maxpy as mp

def create_bird_call_patch():
    # Initialize a new Max patch
    patch = mp.MaxPatch()

    # Generate a metro object to control the timing of our bird call
    metro = patch.place("metro 100", num_objs=1, starting_pos=[0, 0])[0]

    # A toggle to start or stop the metro
    toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]
    
    # Random object to fluctuate the pitch
    random_pitch = patch.place("random 1000", num_objs=1, starting_pos=[100, 0])[0]
    
    # Scale the output of the random object to a more musical range
    scale = patch.place("scale 0 1000 200 800", num_objs=1, starting_pos=[200, 0])[0]
    
    # Oscillator to generate tones
    osc = patch.place("cycle~", num_objs=1, starting_pos=[300, 0])[0]
    
    # Line~ object to smoothly transition between frequencies
    line = patch.place("line~", num_objs=1, starting_pos=[300, 50])[0]
    
    # DAC to output the sound
    dac = patch.place("dac~", num_objs=1, starting_pos=[500, 0])[0]
    
    # Connect objects to generate a fluctuating bird call sound
    patch.connect([metro.outs[0], random_pitch.ins[0]])   # Connect metro to random
    patch.connect([random_pitch.outs[0], scale.ins[0]])   # Connect random to scale
    patch.connect([scale.outs[0], line.ins[0]])           # Connect scale to line~ for smooth frequency transitions
    patch.connect([line.outs[0], osc.ins[0]])             # Connect line~ to cycle~ to modulate the pitch
    patch.connect([osc.outs[0], dac.ins[0]])              # Connect cycle~ to dac~ to output the sound
    patch.connect([toggle.outs[0], metro.ins[0]])         # Connect toggle to metro to start/stop the bird call
    
    # Save the patch
    patch.save("bird4.maxpat")

# Call the function to create the bird call patch
create_bird_call_patch()
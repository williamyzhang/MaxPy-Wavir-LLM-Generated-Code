import maxpy as mp

patch = mp.MaxPatch()

# Create the main cycle object for the bell sound
fund_freq = 110  # Fundamental frequency for the bell sound, in Hz
cycle = patch.place(f"cycle~ {fund_freq}", num_objs=1, starting_pos=[0,200])[0]

# Create an envelope generator to simulate the bell's strike sound
env = patch.place("line~", num_objs=1, starting_pos=[100,0])[0]
# Start quiet, reach full volume, and decay
patch.place("loadbang", num_objs=1, starting_pos=[0,0])[0].connect([env.ins[0], "0, 1 1000, 0 5000"])

# Random frequency modulation to simulate imperfections
rand = patch.place("rand~ 20", num_objs=1, starting_pos=[200,200])[0]
add = patch.place("+~", num_objs=1, starting_pos=[300,200])[0]
patch.connect([rand.outs[0], add.ins[0]])
patch.connect([cycle.outs[0], add.ins[1]])
modulated_cycle = patch.place("*~ 0.1", num_objs=1, starting_pos=[400,200])[0]  # Reduced volume
patch.connect([add.outs[0], modulated_cycle.ins[0]])

# Connect envelope to modulated cycle's amplitude control
patch.connect([env.outs[0], modulated_cycle.ins[1]])

# Connect the result to the dac~
dac = patch.place("dac~", num_objs=1, starting_pos=[500,200])[0]
patch.connect([modulated_cycle.outs[0], dac.ins[0]])
patch.connect([modulated_cycle.outs[0], dac.ins[1]])

patch.save("bell4.maxpat")
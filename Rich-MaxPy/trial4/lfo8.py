import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Sine wave oscillator
sine = patch.place("cycle~", num_objs=1, starting_pos=[100, 100])[0]

# LFO for vibrato effect (a slow sine wave modulator)
lfo_freq = patch.place("cycle~", num_objs=1, starting_pos=[100, 200])[0]

# Scale LFO output to control vibrato depth
scale = patch.place("*~ ", num_objs=1, starting_pos=[100, 300])[0]
patch.place(f"flonum {random.uniform(0.1, 10)}", num_objs=1, starting_pos=[100, 350], connect_to=[scale.ins[1]])

# Control rate of LFO
lfo_rate = patch.place("flonum", num_objs=1, starting_pos=[100, 400])[0]
patch.place(f"flonum {random.uniform(0.1, 20)}", num_objs=1, starting_pos=[100, 450], connect_to=[lfo_rate.ins[0]])

# Add LFO modulation to sine wave oscillator frequency
add = patch.place("+~", num_objs=1, starting_pos=[100, 500])[0]
midi_freq = patch.place("mtof", num_objs=1, starting_pos=[100, 550])[0]

# Setup stereo output with ezdac~
ezdac = patch.place("ezdac~", num_objs=1, starting_pos=[100, 600])[0]

# Connection
patch.connect([sine.outs[0], add.ins[0]])
patch.connect([scale.outs[0], add.ins[1]])
patch.connect([lfo_freq.outs[0], scale.ins[0]])
patch.connect([lfo_rate.outs[0], lfo_freq.ins[0]])
patch.connect([add.outs[0], midi_freq.ins[0]])
patch.connect([midi_freq.outs[0], ezdac.ins[0]])
patch.connect([midi_freq.outs[0], ezdac.ins[1]])  # Stereo output

# Specify the frequency of the sine wave in MIDI note numbers
midi_note = random.randint(40, 80)  # Random MIDI note for the sine wave frequency
patch.connect(patch.place(f"message {midi_note}", num_objs=1, starting_pos=[100, 50]), midi_freq.ins[0])

patch.save("lfo8.maxpat")

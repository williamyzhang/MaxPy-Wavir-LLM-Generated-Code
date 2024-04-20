import maxpy as mp

def create_church_bell(patch, base_freq):
    """
    Creates a church bell where each oscillator plays a harmonic tone
    of the base_freq.
    :param patch: The MaxPatch object
    :param base_freq: The base frequency for the church bell sound.
    """
    harmonics = [1, 2, 2.5, 3, 3.5]  # The harmonic series for the bell sound
    bell_amps = [0.6, 0.4, 0.25, 0.2, 0.15]  # Amplitude for each harmonic

    oscs = []
    for i, harmonic in enumerate(harmonics):
        freq = base_freq * harmonic  # Calculate the frequency for each harmonic
        amp = bell_amps[i]  # Amplitude for each oscillator
        cycle = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[100, i*100 + 100])[0]  # Oscillator
        gain = patch.place(f"*~ {amp}", num_objs=1, starting_pos=[300, i*100 + 100])[0]  # Gain control
        patch.connect([cycle.outs[0], gain.ins[0]])  # Connect oscillator to gain control
        oscs.append(gain)

    dac = patch.place("ezdac~", num_objs=1, starting_pos=[500, 100])[0]
    for osc in oscs:
        patch.connect([osc.outs[0], dac.ins[0]])  # Connect each oscillator to the left channel of dac~
        patch.connect([osc.outs[0], dac.ins[1]])  # Connect each oscillator to the right channel of dac~
    
    return oscs


if __name__ == "__main__":
    patch = mp.MaxPatch()  # Create a new MaxPatch object
    create_church_bell(patch, 220)  # Create church bell with a base frequency of 220Hz
    patch.save("church_bell.maxpat")  # Save the patch
import maxpy

# Create a new patch
patch = maxpy.MaxPatch()

# Generate white noise
noise = patch.add_new_object("noise~")

# Create a low-pass filter with a cutoff frequency of 1000 Hz
filter = patch.add_new_object("biquad~", args=[1, 0, 0, 0, 0])

# Calculate filter coefficients for a low-pass filter at 1000 Hz
# Assuming a sampling rate of 44100 Hz
sampling_rate = 44100
frequency = 1000
omega = 2 * 3.141592653589793 * frequency / sampling_rate
alpha = maxpy.objects.sin(omega) / (2 * 0.707)  # 0.707 is for a Butterworth filter
a0 = 1 + alpha
b0 = (1 - maxpy.objects.cos(omega)) / 2 / a0
b1 = (1 - maxpy.objects.cos(omega)) / a0
b2 = b0
a1 = -2 * maxpy.objects.cos(omega) / a0
a2 = (1 - alpha) / a0

# Update the biquad filter coefficients
filter.args = [b0, b1, b2, a1, a2]

# Connect the objects
patch.connect(noise, 0, filter, 0)

# Optionally, create a dac~ to output sound
dac = patch.add_new_object("dac~")
patch.connect(filter, 0, dac, 0)
patch.connect(filter, 0, dac, 1)

# Save the patch
patch.save("WN10.maxpat")
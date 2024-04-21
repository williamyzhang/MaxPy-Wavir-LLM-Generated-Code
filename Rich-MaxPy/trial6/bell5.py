import maxpy

# Initialize MaxPy
patch = maxpy.MaxPy()

# Define number of bells and their basic properties
number_of_bells = 3
base_frequency = 220  # Base frequency in Hz
frequency_variation_range = 100  # Range of frequency variation
bell_durations = [2000, 3000, 4000]  # Duration of the bells in ms
position_x_start = 100
position_y = 100
horizontal_spacing = 200

# Reverb settings
reverb_send_amount = 0.7

# Create bell sounds with varying pitches and durations
for i in range(number_of_bells):
    # Calculate position
    position_x = position_x_start + (i * horizontal_spacing)
    
    # Generate random pitch variation
    pitch_variation = maxpy.random(-frequency_variation_range, frequency_variation_range)
    frequency = base_frequency + pitch_variation
    
    # Create oscillator for bell sound
    osc = patch.newobject('cycle~', position_x, position_y, args=[frequency])
    
    # Create envelope for bell sound 
    env = patch.newobject('line~', position_x, position_y + 50)
    patch.connect(osc, 0, env, 0)
    
    # Bang object for triggering the bell
    bang = patch.newobject('bang', position_x, position_y + 100, args=[bell_durations[i]])
    patch.connect(bang, 0, env, 0)
    
    # Create reverb send
    send = patch.newobject('send~', position_x, position_y + 150, args=['reverb_send'])
    patch.connect(env, 0, send, 0)
    patch.message('script', 'send', send.objid, reverb_send_amount)  # Set reverb send amount

# Reverb effect (tapin~ and tapout~)
reverb_input = patch.newobject('receive~', 100, position_y + 300, args=['reverb_send'])
reverb_processor = patch.newobject('tapin~', 200, position_y + 300, args=[500])  # 500ms delay for reverb
reverb_output = patch.newobject('tapout~', 300, position_y + 300, args=[500])

# Connect reverb effects
patch.connect(reverb_input, 0, reverb_processor, 0)
patch.connect(reverb_processor, 0, reverb_output, 0)

# Final output to DAC
dac = patch.newobject('ezdac~', 400, position_y + 300)
patch.connect(reverb_output, 0, dac, 0)
patch.connect(reverb_output, 0, dac, 1)

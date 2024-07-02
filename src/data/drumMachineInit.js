import soundq from '../assets/tracks/Heater-1.mp3'
import soundw from '../assets/tracks/Heater-2.mp3'
import sounde from '../assets/tracks/Heater-3.mp3'
import sounda from '../assets/tracks/Heater-4.mp3'
import sounds from '../assets/tracks/Clap.mp3'
import soundd from '../assets/tracks/Open-HH.mp3'
import soundz from '../assets/tracks/Kick_n_Hat.mp3'
import soundx from '../assets/tracks/Kick.mp3'
import soundc from '../assets/tracks/Closed-HH.mp3'

const displayMapping = [{
    'q': 'Heater 1',
    'w': 'Heater 2',
    'e': 'Heater 3',
    'a': 'Heater 4',
    's': 'Clap',
    'd': 'Open HH',
    'z': 'Kick n Hat',
    'x': 'Kick',
    'c': 'Closed HH'
}]

const audioMapping = [{}]
audioMapping['q'] = soundq;
audioMapping['e'] = sounde;
audioMapping['w'] = soundw;
audioMapping['a'] = sounda;
audioMapping['s'] = sounds;
audioMapping['d'] = soundd;
audioMapping['z'] = soundz;
audioMapping['x'] = soundx;
audioMapping['c'] = soundc;

const drumMachineHistory = []
drumMachineHistory[0] =`
In 1972, EKO released the ComputeRhythm, one of the – if not ‘the’ – first fully programmable drum machines. The device had a matrix of push buttons arranged in a 16×6 grid with which patterns could be programmed and this set the template for drum machines and pattern sequencers for decades to come. ComputeRhythm also used a conventional analogue subtractive circuit for generating its drum sounds, – bursts of white, pink or brown noise for snares and cymbals, sine and square waves for kick drums and so on.
`
drumMachineHistory[1] =`
By the end of the decade, Roland had entered the drum machine fray with the CompuRhythm CR-78. Whilst still relying on subtractive synthesis for sound generation and not fully programmable, the CR-78 was nevertheless an important milestone as it was the first drum machine to be controlled via a digital microprocessor. Not only did this hugely increase the number of preset patterns that could be included in the device, it also laid the foundations for the rise of not one but two legends of modern music-making.
`

export {displayMapping, audioMapping, drumMachineHistory}
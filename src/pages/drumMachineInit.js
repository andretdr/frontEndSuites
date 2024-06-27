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

export {displayMapping, audioMapping}
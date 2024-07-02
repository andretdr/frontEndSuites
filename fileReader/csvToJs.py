from csv import reader

f = open("./colors_full.js", 'a')

with open("./colors.csv", 'r') as data:
    for line in reader(data):
        f.write(str("'"+line[2]+"'"))
        f.write(", \n")
f.close()


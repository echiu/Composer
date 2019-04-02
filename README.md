# Composer

## Overview

This project explores the obscure line between sound and music. Is there a clear distinction between consonance and dissonance? It involves programming music theory into code and using computers to procedurally generate a never-ending and constantly-changing piece. Music theory includes modes, progressions, modulations, inversions, and arpeggios. The software is programmed in Javascript, and uses a variety of computer science concepts. Modes are modeled with arrays, progressions are modeled with deterministic finite automatons, modulations are modeled with searching algorithms, and so forth.


## Modes

Modes is a technical term for different types of scales. The most commonly known scales are the Major and Minor scales. Major is actually slang for Dorian, and Minor is actually slang for Aeolian. In reality, a mode or scale is just a series of half steps and whole steps on the piano. Since you can shift the series of half steps and whole steps seven times before ending up at the same scale again, there are seven different types of modes in music theory: Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, and Locrian. Each mode can be represented as an array of half steps (1) and whole steps (2) as shown below. The code can be even more succinct, having only one array and an offset value, but for code readability reasons, I chose to keep them separate.

![](./presentation/modes-1.png)

![](./presentation/modes-2.png)

![](./presentation/modes-3.png)

![](./presentation/modes-4.png)


## Progressions

![](./presentation/progressions-1.png)

![](./presentation/progressions-2.png)

![](./presentation/progressions-3.png)


## Modulations

![](./presentation/modulations-1.png)

![](./presentation/modulations-2.png)

![](./presentation/modulations-3.png)

![](./presentation/modulations-4.png)


## Inversions

![](./presentation/inversions-1.png)

![](./presentation/inversions-2.png)


## Arppegios

![](./presentation/arpeggios-1.png)

![](./presentation/arpeggios-2.png)
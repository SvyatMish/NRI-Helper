import { Unit } from "./unit";

export class Dog extends Unit {
  constructor(name = "dog") {
    super(name, {
      attributes: {
        physical: {
          strength: 4,
          dexterity: 3,
        },
        mental: {
          wits: 3,
          intelligence: 1,
          perception: 5,
        },
      },
      talents: {
        alertness: 4,
        athletics: 2,
        brawl: 4,
        evasion: 3,
        empathy: 1,
        intimidation: 4,
      },
      skills: { stealth: 2 },
      disciplines: { potence: 2 },
    });
  }
}

import {mergeObjects} from "../../utils";
import type {DeepPartial} from "../../types";

export  type Stats = DeepPartial<Unit["stats"]>

export class Unit {
    name: string;
    stats = {
        blood: 0,
        health: 0,
        attributes: {
            physical: {
                strength: 0,
                dexterity: 0,
                stamina: 0
            },
            social: {
                charisma: 0,
                manipulation: 0,
                appearance: 0
            },
            mental: {
                perception: 0,
                intelligence: 0,
                wits: 0
            }
        },
        talents: {
            alertness: 0,
            athletics: 0,
            brawl: 0,
            evasion: 0,
            empathy: 0,
            speech: 0,
            intimidation: 0,
            leadership: 0,
            streetwise: 0,
            cunning: 0
        },
        skills: {
            understandingAnimals: 0,
            crafting: 0,
            driving: 0,
            etiquette: 0,
            firearms: 0,
            meleeWeapons: 0,
            performance: 0,
            security: 0,
            stealth: 0,
            survival: 0
        },
        knowledge: {
            humanities: 0,
            computers: 0,
            finance: 0,
            investigation: 0,
            law: 0,
            languages: 0,
            medicine: 0,
            occultism: 0,
            politics: 0,
            naturalSciences: 0
        },
        disciplines: {
            //Анимализм
            animalism: 0,
            //Прорицание
            auspex: 0,
            //Стремительность
            celerity: 0,
            //Химерия
            chimerstry: 0,
            //Помешательство
            dementation: 0,
            //Доминирование
            dominate: 0,
            //Стойкость
            fortitude: 0,
            //Некромантия
            necromancy: 0,
            //Затемнение
            obfuscate: 0,
            //Власть над Тенью
            obtenebration: 0,
            //Могущество
            potence: 0,
            //Присутствие
            presence: 0,
            //Превращение
            protean: 0,
            //Смертоносность
            quietus: 0,
            //Серпентис
            Serpentis: 0,
            //Тауматургия
            thaumaturgy: 0,
            //Изменчивость
            vicissitude: 0
        }
    };

    constructor(name: string, newStats?: Partial<Stats>) {
        this.name = name;
        if (newStats) {
            this.stats = mergeObjects(this.stats, newStats);
        }
    }

    getStats() {
        return this.stats;
    }

}
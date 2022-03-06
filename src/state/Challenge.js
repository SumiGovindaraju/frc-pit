/**
 * This should be the only file that needs to be updated each season
 * Index is the name of the variable from the TBA API
 * Name is what you want to appear to represent that RP in the pop up
 */

const rankingPointYear = {
    "2016": [
        {
            "index": "teleopDefensesBreached",
            "name": "Defenses Breached"
        },
        {
            "index": "teleopTowerCaptured",
            "name": "Tower Captured"
        }
    ],
    "2017": [
        {
            "index": "kPaRankingPointAchieved",
            "name": "Pressure Reached"
        },
        {
            "index": "rotorRankingPointAchieved",
            "name": "All Rotors Engaged"
        }
    ],
    "2018": [
        {
            "index": "autoQuestRankingPoint",
            "name": "Auto Quest"
        },
        {
            "index": "faceTheBossRankingPoint",
            "name": "Face the Boss"
        }
    ],
    "2019": [
        {
            "index": "completeRocketRankingPoint",
            "name": "Complete Rocket"
        },
        {
            "index": "habDockingRankingPoint",
            "name": "HAB Docking"
        }
    ],
    "2020": [
        {
            "index": "shieldOperationalRankingPoint",
            "name": "Shield Operational"
        },
        {
            "index": "shieldEnergizedRankingPoint",
            "name": "Shield Energized"
        }
    ],
    "2021": [
        {
            "index": "shieldOperationalRankingPoint",
            "name": "Shield Operational"
        },
        {
            "index": "shieldEnergizedRankingPoint",
            "name": "Shield Energized"
        }
    ],
    "2022": [
        {
            "index": "hangarBonusRankingPoint",
            "name": "Hangar Bonus"
        },
        {
            "index": "cargoBonusRankingPoint",
            "name": "Cargo Bonus"
        }
    ]
};

class Challenge {
    static getBonusRankingPoint1(year) {
        return rankingPointYear[year] != null ? rankingPointYear[year][0] : -1;
    }

    static getBonusRankingPoint2(year) {
        return rankingPointYear[year] != null ? rankingPointYear[year][1] : -1;
    }
}

export default Challenge;
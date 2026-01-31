import { vectorAdd } from "../core/core.js";

export const contextSteering = {

    reduceMap(maps) {
        // handling one map only for now
        const { dangerMap } = maps;
        return this.linearWeightedAggregation(dangerMap);
    },

    linearWeightedAggregation(contextMap, receptors, agentAngle) {
        // linear aggregration, global support
        let aggregation = {x: 0, y: 0}
        receptors.forEach((receptor, index) => {
            const contextValue = -1*contextMap[index];
            const contextWeightedReceptorVector = {
                x: contextValue * Math.cos(agentAngle + receptor.angle), 
                y: contextValue * Math.sin(agentAngle + receptor.angle),
            }
            aggregation = vectorAdd(aggregation, contextWeightedReceptorVector)
        });
        console.log("AGGREGATION: ");
        console.log(aggregation);
        console.log(receptors[0])
        const default_vel = {
            x: 1*Math.cos(
                agentAngle + (receptors[0].angle + receptors[receptors.length - 1].angle)/2
            ),
            y: 1*Math.cos(
                agentAngle + (receptors[0].angle + receptors[receptors.length - 1].angle)/2
            ),
        }
        aggregation = vectorAdd(aggregation, default_vel)
        console.log(`aggregation: ${aggregation.x, aggregation.y}`);
        return aggregation;
    },

    interpolateNewVector(proposal, currentVector) {
        const t = 0.02;
        const newVec = {
            x: currentVector.x * (1 - t) + t * proposal.x,
            y: currentVector.y * (1 - t) + t * proposal.y,
        }
        console.log("proposal: ");
        console.log(proposal)
        console.log(newVec);
        return newVec;
    },

    normalizeVector(vec) {
        const length = Math.sqrt(vec.x**2 + vec.y**2);
        if (length == 0) return vec
        return {
            x: vec.x / length,
            y: vec.y / length,
        }
    }
}
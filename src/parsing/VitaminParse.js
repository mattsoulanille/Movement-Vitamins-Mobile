


function VitaminParse(obj) {
    return {
	description: obj.Description,
	mobility: obj.Mobility,
	name: obj.name,
	stability: obj.Stability,
	targetArea: obj["Target Area"],
	youtubeLink: obj.Link
    };
}

export default VitaminParse;

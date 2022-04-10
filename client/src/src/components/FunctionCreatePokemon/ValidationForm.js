export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Pokemon name is required";
  } else if (!/^([A-Za-z])+$/.test(input.name)) {
    errors.name = "Pokemon name is invalid";
  }

  if (!input.img) {
    errors.img = "Pokemon img is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.img)) {
    errors.img = "Url img is invalid";
  }

  if(!input.type.length){
    errors.type = "Type is void";
  }

  if (input.height < 5) {
    errors.height = "Height must be greater than 0";
  }

  if (input.weight < 1) {
    errors.weight = "Weight must be greater than 0";
  }

  if (input.hp < 1) {
    errors.hp = "Hp must be greater than 0";
  }

  if (input.defense < 1) {
    errors.defense = "Defense must be greater than 0";
  }

  if (input.attack < 1) {
    errors.attack = "Attack must be greater than 0";
  }

  if (input.speed < 1) {
    errors.speed = "Speed must be greater than 0";
  }

  return errors;
}

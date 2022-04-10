export function validate(input) {
    let errors = {};
    if (!/^([A-Za-z])+$/.test(input.name)) {
        errors.name = "Pokemon name is invalid";
      }

return errors
}
  export const checkValidity = (value, rules) => {
        let isValid = false

        if (rules.required) {
            isValid = value.trim() !== ''
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength
        }

        return isValid
    }
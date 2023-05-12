export const translateReviewType = (type) => {
    switch (type) {
        case 'learner': return 'Apprenant';
        case 'employer': return 'Employeur';
        case 'funding': return 'Organisme financeur';
        default: return type;
    }
}

export const getAuthHeader = () => {
    return {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
    };
}
export const translateReviewType = (type) => {
    switch (type) {
        case 'learner': return 'Apprenant';
        case 'employer': return 'Employeur';
        case 'funding': return 'Organisme financeur';
        default: return type;
    }
}
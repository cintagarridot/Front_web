import * as Yup from 'yup';

const NewsFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'), 
    content: Yup.string()
        .min(6, 'Too short!')
        .max(255, 'Too Long!')
        .required('Required'),
    /*image: Yup.image()
        .image('Invalid image')*/
});

export default NewsFormSchema;
import { Schema, Model, model } from "mongoose";

const vitalSignsSchema = new Schema({
    'patient': {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    'vital_signs': [{
        'heart_rate': Number,
        'oxygenation': Number,
        'temperature': Number,
        'registered_at': {
            type: Date,
            default: Date.now
        }

    }],
});

// Criar outro model, que guardará os dados normais, ou seja, o model anteriormente criado apenas guardará os dados anormais, e o novo model criado deve ser temporário: usar o TTL . ex: data_expiraçao: {type: Date, index:{expires: '5m'}}

export const VitalSigns = model('VitalSigns', vitalSignsSchema);
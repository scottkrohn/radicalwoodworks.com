import Model from './model';

class Content extends Model {
    constructor() {
        super();

        this.data = {
            id: null,
            type: null,
            content: null,
            created_ts: null,
            updated_ts: null,
        };
    }

    // Setters
    setId = (id) => {
        this.data.id = id;
    };

    setType = (type) => {
        this.data.type = type;
    };

    setContent = (content) => {
        this.data.content = content;
    };

    setCreatedTs = (created_ts) => {
        this.data.created_ts = created_ts;
    };

    setUpdatedTs = (updated_ts) => {
        this.data.updated_ts = updated_ts;
    };

    // Getters
    getId = () => {
        return this.data.id;
    };

    getType = () => {
        return this.data.type;
    };

    getContent = () => {
        return this.data.content;
    };

    getCreatedTs = () => {
        return this.data.created_ts;
    };

    getUpdatedTs = () => {
        return this.data.updated_ts;
    };
}

export default Content;

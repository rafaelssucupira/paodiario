import { Sequelize } from "sequelize";

export class SQL {
    constructor($db, $user, $passwd) {
        this.conn = new Sequelize($db, $user, $passwd, {
            host: "108.179.241.242",
            dialect: "mysql",
            define : {
                timestamps: false,
                freezeTableName: true,

            }
        })

    }
    async isConnected()
    {
        try {
            await this.conn.authenticate();
            return true;
        } catch (error) {
            return error;
        }
    }
    async rawQuery( sql ) {
        return await this.conn.query(sql)
    }

    async defineModel( model, dataTypes ) {
        return this.conn.define(model, dataTypes)
    }

    async select( model, opts ) {
        return await model.findAll(opts)
    }

    async insert(model, data) {
        console.log("data", data);
        return await model.create(data)
    }

    async update(model, data, where) {
        return await model.update(data, where)
    }

    async delete(model, where) {
        return await model.destroy(where)
    }


}

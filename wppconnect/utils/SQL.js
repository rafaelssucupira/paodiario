import { Sequelize } from "sequelize";

export class SQL {
    constructor($host, $db, $user, $passwd) {
        this.conn = new Sequelize($db, $user, $passwd, {
            host: $host ,
            dialect: "mysql",
            dialectOptions : {
                dateStrings : true, //hack
                typeCast: true //hack
            },
            logging: false,
            define : {
                timestamps: false,
                freezeTableName: true
            }
        })

    }
    async isConnected()
    {
        try {
            await this.conn.authenticate();
            return true;
        } catch (error) {
            new Error("Não conectado : " +  error);
        }
    }
    async rawQuery( sql, opts ) {
        return await this.conn.query(sql, opts)
    }

    async defineModel( model, dataTypes ) {
        return this.conn.define(model, dataTypes)
    }

    async select( model, opts ) {
        return await model.findAll(opts)
    }

    async insert(model, data) {
        return await model.create(data)
    }

    async update(model, data, where) {
        return await model.update(data, where)
    }

    async delete(model, where) {
        return await model.destroy(where)
    }

    replaceParams( query, params )  {
        let queryString = query
        for(const data of params)
            {
                queryString = queryString.replace( data.key, data.value );
            }

        return queryString
    }


}

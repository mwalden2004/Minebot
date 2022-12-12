"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.createDataSource = void 0;
const typeorm_1 = require("typeorm");
function createDataSource() {
    return new typeorm_1.DataSource({
        type: 'mongodb',
        url: 'mongodb+srv://mwalden:NJOXr9p2KvLzcRY5@cluster0.bt5v83e.mongodb.net',
        entities: ['build/app/**/*.entity.js'],
        migrations: ['build/migrations/*.js'],
    });
}
exports.createDataSource = createDataSource;
exports.dataSource = createDataSource();
//# sourceMappingURL=db.js.map
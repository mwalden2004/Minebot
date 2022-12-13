"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.createDataSource = void 0;
const typeorm_1 = require("typeorm");
function createDataSource() {
    return new typeorm_1.DataSource({
        type: 'mongodb',
        url: process.env.MONGO_DB_URL,
        useUnifiedTopology: true,
        entities: ['dist/app/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
    });
}
exports.createDataSource = createDataSource;
exports.dataSource = createDataSource();
//# sourceMappingURL=db.js.map
import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateUsers1617449401175 implements MigrationInterface {
  private readonly table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      { name: 'email', type: 'varchar', isNullable: true },
      { name: 'hashed_password', type: 'varchar', isNullable: true },
      { name: 'profile_id', type: 'integer' },
      { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ],
  });

  private readonly foreignKeys = [
    new TableForeignKey({
      name: 'users_profiles_id_fk',
      columnNames: ['profile_id'],
      referencedTableName: 'profiles',
      referencedColumnNames: ['id'],
    }),
  ];

  private readonly indices = [
    new TableIndex({
      name: 'users_email_uindex',
      columnNames: ['email'],
      isUnique: true,
    }),
  ];

  public async up(q: QueryRunner): Promise<void> {
    await q.createTable(this.table);
    await q.createForeignKeys(this.table, this.foreignKeys);
    await q.createIndices(this.table, this.indices);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.dropIndices(this.table, this.indices);
    await q.dropForeignKeys(this.table, this.foreignKeys);
    await q.dropTable(this.table);
  }
}

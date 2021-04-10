import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProfilesCounters1618090242776 implements MigrationInterface {
  private readonly table = new Table({
    name: 'profiles_counters',
    columns: [
      { name: 'profile_id', type: 'integer', isPrimary: true },
      { name: 'posts', type: 'integer', default: 0 },
      { name: 'followers', type: 'integer', default: 0 },
      { name: 'following', type: 'integer', default: 0 },
    ],
  });

  private readonly foreignKeys = [
    new TableForeignKey({
      name: 'profiles_counters_profiles_id_fk',
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profiles',
    }),
  ];

  private readonly indices = [];

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

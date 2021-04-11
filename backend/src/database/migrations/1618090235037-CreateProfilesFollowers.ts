import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateProfilesFollowers1618090235037 implements MigrationInterface {
  private readonly table = new Table({
    name: 'profiles_followers',
    columns: [
      { name: 'profile_id', type: 'integer', isPrimary: true },
      { name: 'target_profile_id', type: 'integer', isPrimary: true },
      { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ],
  });

  private readonly foreignKeys = [
    new TableForeignKey({
      name: 'profiles_followers_profiles_id_fk',
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profiles',
    }),
    new TableForeignKey({
      name: 'profiles_followers_target_profiles_id_fk',
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profiles',
    }),
  ];

  private readonly indices = [
    new TableIndex({
      name: 'profiles_followers_profile_id_index',
      columnNames: ['profile_id'],
    }),
    new TableIndex({
      name: 'profiles_followers_target_profile_id_index',
      columnNames: ['target_profile_id'],
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

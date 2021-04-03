import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateProfiles1616783846305 implements MigrationInterface {
  private readonly table = new Table({
    name: 'profiles',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
      { name: 'screen_name', type: 'varchar' },
      { name: 'indexed_screen_name', type: 'varchar' },
      { name: 'display_name', type: 'varchar', isNullable: true },
      { name: 'bio', type: 'text', isNullable: true },
      { name: 'avatar_uri', type: 'varchar', isNullable: true },
      { name: 'header_uri', type: 'varchar', isNullable: true },
    ],
  });

  private readonly indices = [
    new TableIndex({
      name: 'profiles_indexed_screen_name_uindex',
      columnNames: ['indexed_screen_name'],
      isUnique: true,
    }),
  ];

  public async up(q: QueryRunner): Promise<void> {
    await q.createTable(this.table);
    await q.createIndices(this.table, this.indices);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.dropIndices(this.table, this.indices);
    await q.dropTable(this.table);
  }
}

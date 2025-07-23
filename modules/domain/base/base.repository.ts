import { BaseRepositoryInterface } from "./baseRepository.interface";

export const baseRepository = <TModel>(
  model: any
): BaseRepositoryInterface<TModel> => {
  let query: {
    where: Record<string, any>;
    include: Record<string, boolean>;
    select?: Record<string, boolean>;
    orderBy?: Record<string, "asc" | "desc">; // Add select property here
  } = {
    where: {},
    include: {},
  };

  const resetQuery = () => {
    query = { where: {}, include: {} };
  };

  const builder: BaseRepositoryInterface<TModel> = {
    //Where condition
    where(field: string, value: any) {
      query.where[field] = value;
      return builder;
    },
    //Get not deleted data
    notDeleted() {
      query.where["deletedAt"] = null;
      return builder;
    },
    //Select fields
    select(fields: string | string[]) {
      if (!query.select) {
        query.select = {};
      }

      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          query.select![field] = true;
        });
      } else {
        query.select[fields] = true;
      }
      return builder;
    },
    //Include relations
    with(relations: string | string[]) {
      const handleRelation = (relationString: string) => {
        if (relationString.includes(":")) {
          const [relation, fieldsString] = relationString.split(":");
          const fields = fieldsString.split(",").reduce((acc, field) => {
            acc[field.trim()] = true;
            return acc;
          }, {} as Record<string, boolean>);

          query.include[relation.trim()] = { select: fields } as any;
        } else {
          query.include[relationString.trim()] = true;
        }
      };

      if (Array.isArray(relations)) {
        relations.forEach(handleRelation);
      } else {
        handleRelation(relations);
      }

      return builder;
    },
    //Order by
    order(field: string, direction: "asc" | "desc" = "asc") {
      query.orderBy = { [field]: direction };
      return builder;
    },
    //Raw query
    rawQuery(queryBuilder) {
      return queryBuilder(model);
    },

    //Get all data
    async get() {
      const queryOptions: any = {
        where: query.where,
      };

      if (query.select) {
        queryOptions.select = query.select;
      } else if (Object.keys(query.include).length > 0) {
        queryOptions.include = query.include;
      }

      // Always apply orderBy if it exists
      if (query.orderBy) {
        queryOptions.orderBy = query.orderBy;
      }

      const result = await model.findMany(queryOptions);
      resetQuery();
      return result;
    },

    //Get data with pagination
    async getWithPaginate(page = 1, limit = 10) {
      const queryOptions: any = {
        where: query.where,
      };

      if (query.select) {
        queryOptions.select = query.select;
      } else if (Object.keys(query.include).length > 0) {
        queryOptions.include = query.include;
      }

      // Always apply orderBy if it exists
      if (query.orderBy) {
        queryOptions.orderBy = query.orderBy;
      }

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        model.findMany({
          ...queryOptions,
          skip,
          take: limit,
        }),
        model.count({
          where: query.where,
        }),
      ]);

      return {
        data,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      };
    },
    //Get first data
    async first() {
      const result = await model.findFirst({
        where: query.where,
        include: query.include,
      });
      resetQuery();
      return result;
    },
    //Get data by id
    async find(id: number) {
      const result = await model.findUnique({
        where: { id },
        include: query.include,
      });
      resetQuery();
      return result;
    },
    //Create data
    async create(data: Partial<TModel>) {
      return model.create({ data });
    },
    //Update data by id
    async update(id: number, data: Partial<TModel>) {
      return model.update({ where: { id }, data });
    },
    //Permanent delete data by id
    async delete(id: number) {
      return model.delete({ where: { id } });
    },
    //Soft delete data by id
    async softDelete(id: number, deletedBy?: number) {
      const data: any = { deletedAt: new Date() };
      if (deletedBy !== undefined) {
        data.deletedBy = deletedBy;
      }

      return model.update({ where: { id }, data });
    },
  };

  return builder;
};

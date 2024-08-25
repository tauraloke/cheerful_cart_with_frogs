# frozen_string_literal: true

module Api
  module V1
    # Api class for cart positions
    class Goods2cartsController < ApiController
      def update
        amount = int_param :amount
        id     = int_param :id
        return render json: { error: 'Wrong param' } if !amount || !id

        record = Goods2cart.find(id)
        return render json: { error: 'Record is not found' } unless record

        record.update({ amount: })
        render json: { success: true, id: }
      end

      def delete
        id = int_param :id
        return render json: { error: 'Wrong param' } unless id

        Goods2cart.where(id:).limit(1).destroy_all
        render json: { success: true, id: }
      end

      private

      def int_param(key)
        Integer(params[key])
      rescue ArgumentError
        nil
      end
    end
  end
end

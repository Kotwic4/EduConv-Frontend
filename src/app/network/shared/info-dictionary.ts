export const INFO_DICTIONARY = {
    layers_Dense: 'Use neurons connected to every input value to process data.',
    layers_Activation: 'Apply an activation function on each value.',
    layers_Flatten: 'Change shape of data to 1 dimension.',
    layers_Dropout: 'Randomly change some values to 0.',
    layers_Conv2D: 'Process data with convolutions windows.',
    layers_MaxPooling2D: 'Reducing data with max function for downsampling windows.',
    layers_AveragePooling2D: 'Reducing of data with max function for downsampling windows.',
    layers_BatchNormalization: 'Normalize layer at each batch by maintains standard deviation near 1 and mean close to 0.',

    arguments_units: 'Number of fully connected neurons.',
    arguments_activation:
        'Function to apply on each value.\n' +
        'LINEAR (Identity) - f(x) = x\n' +
        'SOFTMAX - Every value will be in range(0,1) and sum of values will be 1\n' +
        'RELU (Rectified Linear Unit) - f(x) = max(x, 0)\n' +
        'ELU - f(x) = x for x > 0 and f(x) = e^x -1 for x <= 0\n' +
        'TANH - f(x) = tanh(x)\n',
    arguments_filters: 'Filters describe depth dimension of out data.',
    arguments_kernel_size: 'Height and width of conv\nolution window.',
    arguments_pool_size: 'Height and width of pooling window.',
    arguments_strides: 'Specify strides of window along axis.',
    arguments_axis: 'Axis to normalized.',
    arguments_momentum: 'Momentum for the moving variance and the moving mean.',
    arguments_epsilon: 'Small value to avoid dividing by zero.',
    arguments_rate: 'Probability of value to become 0.',

    models: 'Architecture(configuration of layers) of neural network model.',
    trained_models: 'Trained neural network on specified dataset.',
    datasets: 'Collection of data with descriptions, which determine problem one want to solve.',
    epochs: 'Number of iteration over train data to train neural network model.',
    batch_size: 'Number of data applies in one training process.',
    model_id: 'Id of architecture on which model was trained.',
    accuracy: 'Percentage of test data, which was correctly classified.'
};
